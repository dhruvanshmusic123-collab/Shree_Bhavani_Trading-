import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { BRANDS, PRODUCT_CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Authorized Brands | Shree Bhavani Trading Corporation",
  description: "Shree Bhavani Trading Corporation – Authorized distributors for Supreme, Zoloto, Dutron, FlameGuard, RBI and 11+ other premium piping and plumbing brands in Ahmedabad.",
};

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-dark pt-28 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-tag justify-center">
            <span className="w-8 h-px bg-brand-orange" />
            Our Brand Partners
          </p>
          <h1 className="heading-lg text-white mb-4">
            Authorized <span className="text-gradient-orange">Brand Distributors</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We are authorized distributors for 16+ of India&apos;s most trusted piping, plumbing,
            valve, and waterproofing brands. Every product comes with authenticity certification.
          </p>
        </div>

        {/* Brand grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {BRANDS.map((brand) => (
            <div
              key={brand.id}
              className="card-industrial p-6 hover:border-brand-orange/30 transition-all group text-center"
            >
              {/* Logo placeholder */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 transition-transform group-hover:scale-110"
                style={{
                  backgroundColor: brand.color + "18",
                  border: `2px solid ${brand.color}30`,
                  color: brand.color,
                }}
              >
                {brand.name[0]}
              </div>
              <h3 className="text-white font-bold text-lg mb-1 group-hover:text-brand-orange transition-colors">
                {brand.name}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">
                {brand.description}
              </p>
              <Link
                href={`/products?brand=${brand.name.toLowerCase().replace(/\s/g, "-")}`}
                className="inline-flex items-center gap-1.5 text-xs text-brand-orange hover:underline"
              >
                View Products
                <ArrowRight size={12} />
              </Link>
            </div>
          ))}
        </div>

        {/* Authorized distributor notice */}
        <div className="card-glass p-8 text-center mb-12">
          <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🏆</span>
          </div>
          <h2 className="text-white font-bold text-xl mb-3">
            Authorized Distributor Certificates
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-6">
            We hold valid authorized distributor certificates for all brands listed above.
            You can request copies of these certificates along with your purchase — ensuring
            100% genuine products for every order.
          </p>
          <Link href="/contact" className="btn-primary">
            Request Certificate Copies
          </Link>
        </div>

        {/* Browse by category */}
        <div>
          <h2 className="heading-md text-white mb-6">Browse by Product Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {PRODUCT_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="flex items-center gap-3 p-3 border border-white/5 hover:border-brand-orange/30 rounded-xl transition-all group"
              >
                <span className="text-xl">{cat.icon}</span>
                <div className="min-w-0">
                  <p className="text-gray-300 text-sm truncate group-hover:text-white transition-colors">
                    {cat.name}
                  </p>
                </div>
                <ArrowRight size={12} className="text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity ml-auto flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
