import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + "..." : str;
}

export function getWhatsAppLink(message: string, phone?: string): string {
  const num = phone || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919824017613";
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

export function buildInquiryMessage(productName?: string): string {
  if (productName) {
    return `Hello Shree Bhavani Trading Corporation,\n\nI would like to enquire about: *${productName}*\n\nPlease share the price and availability.\n\nThank you.`;
  }
  return `Hello Shree Bhavani Trading Corporation,\n\nI would like to enquire about your products and pricing.\n\nPlease get in touch.\n\nThank you.`;
}
