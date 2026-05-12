"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, GripVertical } from "lucide-react";
import { adminCategoryApi } from "@/lib/api";
import type { Category } from "@/types";
import toast from "react-hot-toast";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: "", description: "", icon: "", isActive: true });

  const load = async () => {
    setLoading(true);
    try {
      const res = await adminCategoryApi.getAll();
      setCategories(res.data.data || []);
    } catch {
      toast.error("Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this category?")) return;
    try {
      await adminCategoryApi.delete(id);
      toast.success("Deleted");
      load();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white font-display text-2xl font-bold">Categories</h1>
          <p className="text-gray-500 text-sm mt-1">{categories.length} categories</p>
        </div>
        <button className="btn-primary">
          <Plus size={16} />
          Add Category
        </button>
      </div>

      <div className="card-industrial overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : (
          <table className="table-dark">
            <thead>
              <tr>
                <th>Order</th>
                <th>Category</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <GripVertical size={14} className="text-gray-600 cursor-grab" />
                      <span className="text-gray-500">{cat.sortOrder}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{cat.icon}</span>
                      <span className="text-white font-medium text-sm">{cat.name}</span>
                    </div>
                  </td>
                  <td className="max-w-xs">
                    <p className="text-gray-500 text-xs truncate">{cat.description}</p>
                  </td>
                  <td>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      cat.isActive
                        ? "bg-green-900/30 text-green-400"
                        : "bg-gray-900/30 text-gray-500"
                    }`}>
                      {cat.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button className="text-gray-500 hover:text-brand-orange transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="text-gray-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
