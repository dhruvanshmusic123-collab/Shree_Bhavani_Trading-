"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { inquiryApi } from "@/lib/api";
import type { Inquiry } from "@/types";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().optional(),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    try {
      await inquiryApi.submit({
        ...data,
        company: data.company || "",
        productIds: [],
        status: "PENDING",
        type: "GENERAL",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        id: 0,
      } as Inquiry);
      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch {
      // Fallback – open email
      const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nCompany: ${data.company || "N/A"}\n\nMessage:\n${data.message}`;
      window.location.href = `mailto:${COMPANY.email.primary}?subject=Enquiry from ${data.name}&body=${encodeURIComponent(body)}`;
      toast.success("Opening your email app...");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark pt-28 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-tag justify-center">
            <span className="w-8 h-px bg-brand-orange" />
            Get in Touch
          </p>
          <h1 className="heading-lg text-white mb-4">
            Contact <span className="text-gradient-orange">Us</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Reach out for product enquiries, bulk quotations, or to visit our showroom in
            Ghatlodia, Ahmedabad.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-industrial p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-brand-orange" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Visit Our Store</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{COMPANY.address.full}</p>
                  <a
                    href={COMPANY.social.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-orange text-sm hover:underline mt-2 inline-block"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card-industrial p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-brand-orange" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Call Us</h3>
                  {COMPANY.phone.display.map((num) => (
                    <a
                      key={num}
                      href={`tel:${num.replace(/\s/g, "")}`}
                      className="block text-gray-400 hover:text-brand-orange text-sm mb-1 transition-colors"
                    >
                      {num}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card-industrial p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-brand-orange" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Email Us</h3>
                  <a
                    href={`mailto:${COMPANY.email.primary}`}
                    className="text-gray-400 hover:text-brand-orange text-sm transition-colors"
                  >
                    {COMPANY.email.display}
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card-industrial p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#25D366]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={18} className="text-[#25D366]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">WhatsApp</h3>
                  <p className="text-gray-500 text-sm mb-2">
                    Quick queries and requirement lists
                  </p>
                  <a
                    href={COMPANY.social.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm bg-[#25D366] hover:bg-[#20BC5A] text-white px-4 py-2 rounded-lg transition-all font-medium"
                  >
                    <MessageCircle size={14} />
                    Chat Now
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card-industrial p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-brand-orange" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Business Hours</h3>
                  <p className="text-gray-400 text-sm">{COMPANY.businessHours.weekdays}</p>
                  <p className="text-gray-500 text-sm">{COMPANY.businessHours.sunday}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="card-industrial p-6 sm:p-8">
              <h2 className="text-white font-semibold text-lg mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-xs font-medium mb-1.5 block">
                      Full Name *
                    </label>
                    <input
                      {...register("name")}
                      placeholder="Your name"
                      className="input-field text-sm"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs font-medium mb-1.5 block">
                      Phone Number *
                    </label>
                    <input
                      {...register("phone")}
                      placeholder="+91 98765 43210"
                      className="input-field text-sm"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">
                    Email Address *
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="your@email.com"
                    className="input-field text-sm"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">
                    Company / Organization
                  </label>
                  <input
                    {...register("company")}
                    placeholder="Your company name"
                    className="input-field text-sm"
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">
                    Message *
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Tell us about your requirements..."
                    className="input-field text-sm resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map placeholder */}
            <div className="mt-6 card-industrial overflow-hidden">
              <div className="h-48 bg-dark-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={32} className="text-brand-orange mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Ghatlodia, Ahmedabad – 380061</p>
                  <a
                    href={COMPANY.social.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-orange text-sm hover:underline mt-1 inline-block"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
