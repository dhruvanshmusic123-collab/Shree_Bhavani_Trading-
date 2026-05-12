import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Award, Truck, Shield, Users } from "lucide-react";
import { COMPANY, BRANDS, PRODUCT_CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | Shree Bhavani Trading Corporation",
  description: "Shree Bhavani Trading Corporation – Established in 1994, authorized wholesale distributors of piping, plumbing, valves and waterproofing systems in Ahmedabad.",
};

const VALUES = [
  { icon: Shield, title: "Authenticity", desc: "Only genuine, certified products from authorized manufacturers" },
  { icon: Award, title: "Quality", desc: "IS/BIS standard products with quality certification" },
  { icon: Truck, title: "Reliability", desc: "On-time delivery across Ahmedabad and Gujarat" },
  { icon: Users, title: "Service", desc: "Expert technical guidance for every project requirement" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark pt-28 pb-20">
      <div className="container-custom">
        {/* Hero */}
        <div className="max-w-3xl mb-16">
          <p className="section-tag">
            <span className="w-8 h-px bg-brand-orange" />
            Our Story
          </p>
          <h1 className="heading-xl text-white mb-6">
            Ahmedabad&apos;s Trusted
            <br />
            <span className="text-gradient-orange">Piping Partner</span>
            <br />
            Since 1994
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            For over 30 years, Shree Bhavani Trading Corporation has been the preferred supplier of
            piping, plumbing, drainage, valve, and waterproofing materials for contractors,
            builders, architects, and engineers across Gujarat.
          </p>
        </div>

        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="heading-md text-white mb-4">How It All Began</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Founded in 1994 at Ghatlodia, Ahmedabad, Shree Bhavani Trading Corporation started
                with a vision to provide quality piping materials to the rapidly growing
                construction industry in Gujarat.
              </p>
              <p>
                Over three decades, we have grown to become authorized distributors for 16+ premium
                brands including Supreme, Zoloto, Dutron, and many others — covering everything
                from UPVC pressure pipes to industrial valves and waterproofing chemicals.
              </p>
              <p>
                Our centrally located store at Sattadhar Cross Road, Sola Road in Ghatlodia
                serves as a one-stop destination for contractors and builders sourcing all their
                project materials under one roof.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "1994", label: "Year Founded", sub: "30+ years in business" },
              { num: "500+", label: "Products", sub: "Across 21 categories" },
              { num: "16+", label: "Brands", sub: "Authorized distributor" },
              { num: "2000+", label: "Clients", sub: "Across Gujarat" },
            ].map((item) => (
              <div key={item.label} className="card-industrial p-5">
                <p className="font-display text-3xl font-bold text-brand-orange">{item.num}</p>
                <p className="text-white font-semibold text-sm mt-1">{item.label}</p>
                <p className="text-gray-500 text-xs mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="heading-md text-white text-center mb-10">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-industrial p-6 text-center">
                <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-brand-orange" />
                </div>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What we offer */}
        <div className="mb-20">
          <h2 className="heading-md text-white mb-4">What We Offer</h2>
          <p className="text-gray-400 mb-8">
            Complete piping and plumbing solutions across 21 product categories:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PRODUCT_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="flex items-center gap-3 p-3 border border-white/5 hover:border-brand-orange/30 rounded-xl transition-all group"
              >
                <span className="text-xl">{cat.icon}</span>
                <div className="flex-1">
                  <p className="text-gray-300 text-sm group-hover:text-white transition-colors">
                    {cat.name}
                  </p>
                  <p className="text-gray-600 text-xs">{cat.count} products</p>
                </div>
                <ArrowRight size={14} className="text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>

        {/* Authorized brands */}
        <div className="mb-20">
          <h2 className="heading-md text-white mb-8">Authorized Brands</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {BRANDS.map((brand) => (
              <div
                key={brand.id}
                className="card-industrial p-3 text-center hover:border-brand-orange/30 transition-all"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mx-auto mb-1.5"
                  style={{
                    backgroundColor: brand.color + "22",
                    border: `1px solid ${brand.color}44`,
                    color: brand.color,
                  }}
                >
                  {brand.name[0]}
                </div>
                <p className="text-gray-300 text-xs font-medium">{brand.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-brand-orange/10 via-transparent to-brand-blue/10 border border-white/5 rounded-2xl p-10 text-center">
          <h2 className="heading-md text-white mb-4">Partner with Us</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Whether you&apos;re a contractor, builder, architect, or plumber — we&apos;re ready to
            be your trusted materials partner.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quote" className="btn-primary">
              Request a Quote
              <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn-ghost">
              Visit Our Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
