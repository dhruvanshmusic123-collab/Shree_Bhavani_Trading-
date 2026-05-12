"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Plus, Trash2, Upload, Send, Info } from "lucide-react";
import { COMPANY, PRODUCT_CATEGORIES } from "@/lib/constants";
import { inquiryApi } from "@/lib/api";

const itemSchema = z.object({
  productName: z.string().min(1, "Product name required"),
  quantity: z.string().min(1, "Quantity required"),
  unit: z.string().min(1, "Unit required"),
  specifications: z.string().optional(),
});

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
  company: z.string().optional(),
  deliveryAddress: z.string().min(5, "Delivery address required"),
  items: z.array(itemSchema).min(1, "Add at least one item"),
  additionalNotes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function QuotePage() {
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      items: [{ productName: "", quantity: "", unit: "nos", specifications: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    try {
      await inquiryApi.submitQuote({
        ...data,
        company: data.company || "",
        items: data.items,
        additionalNotes: data.additionalNotes || "",
        requirementFile: file || undefined,
      });
      toast.success("Quote request submitted! We'll send you a quotation shortly.");
      reset();
      setFile(null);
    } catch {
      // Fallback to email
      const itemsList = data.items
        .map((item, i) => `${i + 1}. ${item.productName} — ${item.quantity} ${item.unit}${item.specifications ? ` (${item.specifications})` : ""}`)
        .join("\n");
      const body = `Quote Request from ${data.name}\n\nContact Details:\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nCompany: ${data.company || "N/A"}\nDelivery: ${data.deliveryAddress}\n\nItems Required:\n${itemsList}\n\nNotes: ${data.additionalNotes || "None"}`;
      window.location.href = `mailto:${COMPANY.email.primary}?subject=Quote Request - ${data.name}&body=${encodeURIComponent(body)}`;
      toast.success("Opening email app with your quote request...");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark pt-28 pb-20">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="section-tag justify-center">
            <span className="w-8 h-px bg-brand-orange" />
            Request a Quote
          </p>
          <h1 className="heading-lg text-white mb-4">
            Get a <span className="text-gradient-orange">Wholesale Quote</span>
          </h1>
          <p className="text-gray-400">
            Fill in your requirements and we&apos;ll send you a competitive quotation within
            2–4 hours.
          </p>
        </div>

        <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-xl p-4 mb-8 flex gap-3">
          <Info size={16} className="text-brand-orange flex-shrink-0 mt-0.5" />
          <p className="text-gray-300 text-sm">
            You can also share your requirement list via{" "}
            <a
              href={COMPANY.social.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-orange hover:underline"
            >
              WhatsApp
            </a>{" "}
            or email at{" "}
            <a
              href={`mailto:${COMPANY.email.primary}`}
              className="text-brand-orange hover:underline"
            >
              {COMPANY.email.display}
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Contact details */}
          <div className="card-industrial p-6">
            <h2 className="text-white font-semibold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-xs font-medium mb-1.5 block">Name *</label>
                <input {...register("name")} placeholder="Your name" className="input-field text-sm" />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="text-gray-400 text-xs font-medium mb-1.5 block">Phone *</label>
                <input {...register("phone")} placeholder="+91 98765 43210" className="input-field text-sm" />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="text-gray-400 text-xs font-medium mb-1.5 block">Email *</label>
                <input {...register("email")} type="email" placeholder="your@email.com" className="input-field text-sm" />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="text-gray-400 text-xs font-medium mb-1.5 block">Company</label>
                <input {...register("company")} placeholder="Company / Project name" className="input-field text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-gray-400 text-xs font-medium mb-1.5 block">Delivery Address *</label>
                <input {...register("deliveryAddress")} placeholder="Site / delivery address" className="input-field text-sm" />
                {errors.deliveryAddress && <p className="text-red-400 text-xs mt-1">{errors.deliveryAddress.message}</p>}
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="card-industrial p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Product Requirements</h2>
              <button
                type="button"
                onClick={() => append({ productName: "", quantity: "", unit: "nos", specifications: "" })}
                className="badge-orange cursor-pointer hover:bg-brand-orange/20 transition-colors"
              >
                <Plus size={12} />
                Add Item
              </button>
            </div>

            {/* Category quick-fill */}
            <div className="mb-4">
              <p className="text-gray-500 text-xs mb-2">Quick-add from category:</p>
              <div className="flex flex-wrap gap-2">
                {PRODUCT_CATEGORIES.slice(0, 8).map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() =>
                      append({
                        productName: cat.name,
                        quantity: "",
                        unit: "nos",
                        specifications: "",
                      })
                    }
                    className="text-xs bg-dark-200 hover:bg-dark-300 border border-white/5 text-gray-400 hover:text-white px-2.5 py-1.5 rounded-lg transition-all"
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-12 gap-3 items-start"
                >
                  <div className="col-span-1 flex items-center justify-center h-10 text-gray-600 text-sm">
                    {index + 1}.
                  </div>
                  <div className="col-span-4 sm:col-span-5">
                    <input
                      {...register(`items.${index}.productName`)}
                      placeholder="Product name / category"
                      className="input-field text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      {...register(`items.${index}.quantity`)}
                      placeholder="Qty"
                      className="input-field text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <select {...register(`items.${index}.unit`)} className="input-field text-sm">
                      <option value="nos">nos</option>
                      <option value="meters">m</option>
                      <option value="kg">kg</option>
                      <option value="sets">sets</option>
                      <option value="liters">ltrs</option>
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-2">
                    <input
                      {...register(`items.${index}.specifications`)}
                      placeholder="Size/spec"
                      className="input-field text-sm"
                    />
                  </div>
                  <div className="col-span-1 flex items-center justify-center h-10">
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-gray-600 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {errors.items && (
              <p className="text-red-400 text-xs mt-2">{errors.items.message}</p>
            )}
          </div>

          {/* Additional info */}
          <div className="card-industrial p-6">
            <h2 className="text-white font-semibold mb-4">Additional Information</h2>

            {/* File upload */}
            <div className="mb-4">
              <label className="text-gray-400 text-xs font-medium mb-1.5 block">
                Upload Requirement Sheet (optional)
              </label>
              <label className="flex items-center gap-3 border border-dashed border-white/20 hover:border-brand-orange/40 rounded-lg p-4 cursor-pointer transition-all group">
                <Upload size={18} className="text-gray-500 group-hover:text-brand-orange transition-colors" />
                <div>
                  <p className="text-gray-400 text-sm">
                    {file ? file.name : "Click to upload PDF / Excel / Word"}
                  </p>
                  <p className="text-gray-600 text-xs mt-0.5">Max 10MB</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.xlsx,.xls,.doc,.docx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>

            <div>
              <label className="text-gray-400 text-xs font-medium mb-1.5 block">
                Additional Notes
              </label>
              <textarea
                {...register("additionalNotes")}
                rows={3}
                placeholder="Any special requirements, preferred brands, delivery timeline..."
                className="input-field text-sm resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60"
          >
            {submitting ? (
              "Submitting..."
            ) : (
              <>
                <Send size={18} />
                Submit Quote Request
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
