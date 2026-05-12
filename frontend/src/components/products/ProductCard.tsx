"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Eye, Star } from "lucide-react";
import type { Product } from "@/types";
import { getWhatsAppLink, buildInquiryMessage, truncate } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";

export default function ProductCard({ product }: { product: Product }) {
  const whatsappUrl = getWhatsAppLink(
    buildInquiryMessage(product.name),
    COMPANY.whatsapp
  );

  return (
    <div className="card-industrial product-card-hover group flex flex-col h-full">
      {/* Image */}
      <div className="relative h-44 bg-dark-200 rounded-t-xl overflow-hidden">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl">
              {product.category?.icon || "📦"}
            </span>
          </div>
        )}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isFeatured && (
            <span className="badge-orange text-[10px]">
              <Star size={9} className="fill-brand-orange" />
              Featured
            </span>
          )}
          {product.brand && (
            <span className="bg-dark/80 text-gray-300 text-[10px] font-medium px-2 py-0.5 rounded-full border border-white/10">
              {product.brand.name}
            </span>
          )}
        </div>

        {/* Quick actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/products/${product.slug}`}
            className="w-10 h-10 bg-dark/80 hover:bg-brand-orange border border-white/20 rounded-full flex items-center justify-center text-white transition-all"
            title="View details"
          >
            <Eye size={16} />
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-[#25D366]/90 hover:bg-[#25D366] rounded-full flex items-center justify-center text-white transition-all"
            title="Enquire on WhatsApp"
          >
            <MessageCircle size={16} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex-1">
          {product.category && (
            <p className="text-brand-orange text-[11px] font-semibold uppercase tracking-wider mb-1">
              {product.category.name}
            </p>
          )}
          <h3 className="text-white text-sm font-semibold leading-snug mb-2 group-hover:text-brand-orange transition-colors">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="text-gray-500 text-xs leading-relaxed mb-3">
            {truncate(product.shortDescription || product.description, 80)}
          </p>

          {/* Sizes preview */}
          {product.availableSizes?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {product.availableSizes.slice(0, 4).map((size) => (
                <span
                  key={size}
                  className="text-[10px] bg-dark-200 border border-white/5 text-gray-400 px-1.5 py-0.5 rounded"
                >
                  {size}
                </span>
              ))}
              {product.availableSizes.length > 4 && (
                <span className="text-[10px] text-gray-600">
                  +{product.availableSizes.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/5">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 text-center text-xs font-medium text-gray-400 hover:text-white bg-dark-200 hover:bg-dark-300 py-2 rounded-lg transition-all"
          >
            View Details
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-xs font-medium text-white bg-brand-orange/90 hover:bg-brand-orange py-2 rounded-lg transition-all"
          >
            Enquire
          </a>
        </div>
      </div>
    </div>
  );
}
