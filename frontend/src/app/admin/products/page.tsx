"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Star, Eye, EyeOff, Package } from "lucide-react";
import { adminProductApi, adminCategoryApi, adminBrandApi } from "@/lib/api";
import type { Product, Category, Brand } from "@/types";
import toast from "react-hot-toast";
import { formatDate } from "@/lib/utils";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pRes, cRes, bRes] = await Promise.all([
        adminProductApi.getAll(),
        adminCategoryApi.getAll(),
        adminBrandApi.getAll(),
      ]);
      setProducts(pRes.data.content || []);
      setCategories(cRes.data.data || []);
      setBrands(bRes.data.data || []);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    try {
      await adminProductApi.delete(id);
      toast.success("Product deleted");
      loadData();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleToggleFeatured = async (id: number) => {
    try {
      await adminProductApi.toggleFeatured(id);
      loadData();
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleToggleActive = async (id: number) => {
    try {
      await adminProductApi.toggleActive(id);
      loadData();
    } catch {
      toast.error("Failed to update");
    }
  };

  const filtered = products.filter(
    (p) =>
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white font-display text-2xl font-bold">Products</h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} total products</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-9 text-sm"
        />
      </div>

      {/* Table */}
      <div className="card-industrial overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Package size={40} className="text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500">No products found</p>
            <button onClick={() => setShowForm(true)} className="btn-primary mt-4">
              Add First Product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-dark">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div>
                        <p className="text-white font-medium text-sm">{product.name}</p>
                        <p className="text-gray-600 text-xs">{product.slug}</p>
                      </div>
                    </td>
                    <td>
                      <span className="badge-orange">{product.category?.name || "—"}</span>
                    </td>
                    <td>
                      <span className="text-gray-400 text-sm">{product.brand?.name || "—"}</span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleActive(product.id)}
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          product.isActive
                            ? "bg-green-900/30 text-green-400"
                            : "bg-red-900/30 text-red-400"
                        }`}
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleToggleFeatured(product.id)}>
                        <Star
                          size={16}
                          className={product.isFeatured ? "text-brand-orange fill-brand-orange" : "text-gray-600"}
                        />
                      </button>
                    </td>
                    <td className="text-xs text-gray-500">
                      {formatDate(product.createdAt)}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.open(`/products/${product.slug}`, "_blank")}
                          className="text-gray-500 hover:text-white transition-colors"
                          title="View"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          className="text-gray-500 hover:text-brand-orange transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-gray-500 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
