"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, Building2, MessageSquare, Clock, CheckCircle, XCircle, Eye } from "lucide-react";
import { adminInquiryApi } from "@/lib/api";
import type { Inquiry } from "@/types";
import toast from "react-hot-toast";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS = ["PENDING", "REVIEWED", "RESPONDED", "CLOSED"] as const;

const STATUS_CONFIG = {
  PENDING: { label: "Pending", color: "text-yellow-400 bg-yellow-900/20" },
  REVIEWED: { label: "Reviewed", color: "text-blue-400 bg-blue-900/20" },
  RESPONDED: { label: "Responded", color: "text-green-400 bg-green-900/20" },
  CLOSED: { label: "Closed", color: "text-gray-400 bg-gray-900/20" },
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await adminInquiryApi.getAll({ status: statusFilter || undefined });
      setInquiries(res.data.content || []);
    } catch {
      toast.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [statusFilter]);

  const updateStatus = async (id: number, status: string) => {
    try {
      await adminInquiryApi.updateStatus(id, status);
      toast.success("Status updated");
      load();
      if (selected?.id === id) setSelected(null);
    } catch {
      toast.error("Failed to update");
    }
  };

  const deleteInquiry = async (id: number) => {
    if (!confirm("Delete this inquiry?")) return;
    try {
      await adminInquiryApi.delete(id);
      toast.success("Deleted");
      load();
      if (selected?.id === id) setSelected(null);
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white font-display text-2xl font-bold">Inquiries</h1>
          <p className="text-gray-500 text-sm mt-1">{inquiries.length} inquiries</p>
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field w-40 text-sm"
          >
            <option value="">All Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* List */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : inquiries.length === 0 ? (
            <div className="card-industrial p-8 text-center">
              <MessageSquare size={32} className="text-gray-700 mx-auto mb-3" />
              <p className="text-gray-500">No inquiries found</p>
            </div>
          ) : (
            inquiries.map((inquiry) => (
              <button
                key={inquiry.id}
                onClick={() => setSelected(inquiry)}
                className={cn(
                  "w-full text-left card-industrial p-4 hover:border-brand-orange/30 transition-all",
                  selected?.id === inquiry.id && "border-brand-orange/50"
                )}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="text-white font-medium text-sm">{inquiry.name}</p>
                    <p className="text-gray-500 text-xs">{inquiry.company || inquiry.email}</p>
                  </div>
                  <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", STATUS_CONFIG[inquiry.status].color)}>
                    {STATUS_CONFIG[inquiry.status].label}
                  </span>
                </div>
                <p className="text-gray-400 text-xs line-clamp-2 mb-2">
                  {inquiry.message || "Quote request"}
                </p>
                <div className="flex items-center justify-between">
                  <span className="badge-blue">{inquiry.type}</span>
                  <span className="text-gray-600 text-xs">{formatDate(inquiry.createdAt)}</span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Detail panel */}
        {selected ? (
          <div className="card-industrial p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-white font-semibold">Inquiry Details</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-500 hover:text-white"
              >
                <XCircle size={18} />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-300 w-24">Name</span>
                <span className="text-gray-400">{selected.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone size={14} className="text-brand-orange" />
                <a href={`tel:${selected.phone}`} className="text-gray-400 hover:text-brand-orange">
                  {selected.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail size={14} className="text-brand-orange" />
                <a href={`mailto:${selected.email}`} className="text-gray-400 hover:text-brand-orange">
                  {selected.email}
                </a>
              </div>
              {selected.company && (
                <div className="flex items-center gap-2 text-sm">
                  <Building2 size={14} className="text-brand-orange" />
                  <span className="text-gray-400">{selected.company}</span>
                </div>
              )}
            </div>

            {selected.message && (
              <div className="mb-4">
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">Message</p>
                <p className="text-gray-300 text-sm leading-relaxed bg-dark-200 p-3 rounded-lg">
                  {selected.message}
                </p>
              </div>
            )}

            <div className="mb-6">
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">Update Status</p>
              <div className="grid grid-cols-2 gap-2">
                {STATUS_OPTIONS.map((status) => (
                  <button
                    key={status}
                    onClick={() => updateStatus(selected.id, status)}
                    className={cn(
                      "py-2 px-3 rounded-lg text-xs font-medium transition-all border",
                      selected.status === status
                        ? "border-brand-orange bg-brand-orange/10 text-brand-orange"
                        : "border-white/5 text-gray-500 hover:border-white/20 hover:text-white"
                    )}
                  >
                    {STATUS_CONFIG[status].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href={`mailto:${selected.email}?subject=Re: Your Enquiry at Shree Bhavani Trading&body=Dear ${selected.name},%0A%0AThank you for contacting Shree Bhavani Trading Corporation.%0A%0A`}
                className="btn-primary flex-1 justify-center text-sm"
              >
                <Mail size={14} />
                Reply
              </a>
              <button
                onClick={() => deleteInquiry(selected.id)}
                className="btn-ghost text-red-400 border-red-900/30 hover:bg-red-900/10 px-3"
              >
                <XCircle size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="card-industrial p-8 flex flex-col items-center justify-center text-center hidden lg:flex">
            <Eye size={32} className="text-gray-700 mb-3" />
            <p className="text-gray-500 text-sm">Select an inquiry to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
