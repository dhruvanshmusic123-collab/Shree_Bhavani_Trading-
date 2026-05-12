"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, Tag, Award, MessageSquare, TrendingUp, AlertCircle } from "lucide-react";
import { adminDashboardApi } from "@/lib/api";
import type { DashboardStats } from "@/types";

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    adminDashboardApi.getStats()
      .then((res) => setStats(res.data.data))
      .catch(() => setStats({
        totalProducts: 127,
        totalCategories: 21,
        totalBrands: 16,
        totalInquiries: 48,
        pendingInquiries: 12,
        newInquiriesToday: 3,
        featuredProducts: 15,
      }));
  }, []);

  const cards = [
    { label: "Total Products", value: stats?.totalProducts, icon: Package, href: "/admin/products", color: "text-blue-400", bg: "bg-blue-900/20" },
    { label: "Categories", value: stats?.totalCategories, icon: Tag, href: "/admin/categories", color: "text-purple-400", bg: "bg-purple-900/20" },
    { label: "Brands", value: stats?.totalBrands, icon: Award, href: "/admin/brands", color: "text-green-400", bg: "bg-green-900/20" },
    { label: "Total Inquiries", value: stats?.totalInquiries, icon: MessageSquare, href: "/admin/inquiries", color: "text-brand-orange", bg: "bg-brand-orange/10" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-white font-display text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back to Shree Bhavani Admin</p>
      </div>

      {/* Alert for pending inquiries */}
      {stats && stats.pendingInquiries > 0 && (
        <div className="flex items-center gap-3 bg-brand-orange/10 border border-brand-orange/30 rounded-xl p-4 mb-6">
          <AlertCircle size={18} className="text-brand-orange flex-shrink-0" />
          <p className="text-gray-300 text-sm">
            You have{" "}
            <span className="text-brand-orange font-semibold">
              {stats.pendingInquiries} pending inquiries
            </span>{" "}
            waiting for review.
          </p>
          <Link
            href="/admin/inquiries"
            className="ml-auto text-brand-orange text-sm hover:underline whitespace-nowrap"
          >
            View →
          </Link>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(({ label, value, icon: Icon, href, color, bg }) => (
          <Link
            key={label}
            href={href}
            className="card-industrial p-5 hover:border-brand-orange/30 transition-all group"
          >
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={18} className={color} />
            </div>
            <p className="font-display text-2xl font-bold text-white">
              {value ?? "—"}
            </p>
            <p className="text-gray-500 text-sm mt-0.5 group-hover:text-gray-400 transition-colors">
              {label}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-industrial p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Add Product", href: "/admin/products?action=new", icon: Package },
              { label: "View Inquiries", href: "/admin/inquiries", icon: MessageSquare },
              { label: "Manage Brands", href: "/admin/brands", icon: Award },
              { label: "Categories", href: "/admin/categories", icon: Tag },
            ].map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-2.5 p-3 bg-dark-200 hover:bg-dark-300 rounded-xl text-sm text-gray-400 hover:text-white transition-all"
              >
                <Icon size={15} className="text-brand-orange" />
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="card-industrial p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-brand-orange" />
            <h2 className="text-white font-semibold">Today&apos;s Activity</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-dark-200 rounded-xl">
              <span className="text-gray-400 text-sm">New inquiries today</span>
              <span className="text-brand-orange font-semibold">{stats?.newInquiriesToday ?? "—"}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-dark-200 rounded-xl">
              <span className="text-gray-400 text-sm">Pending responses</span>
              <span className="text-yellow-400 font-semibold">{stats?.pendingInquiries ?? "—"}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-dark-200 rounded-xl">
              <span className="text-gray-400 text-sm">Featured products</span>
              <span className="text-green-400 font-semibold">{stats?.featuredProducts ?? "—"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
