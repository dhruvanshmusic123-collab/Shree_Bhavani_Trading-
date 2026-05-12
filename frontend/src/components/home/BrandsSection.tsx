"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { BRANDS } from "@/lib/constants";

export default function BrandsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-dark relative overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-tag justify-center">
            <span className="w-8 h-px bg-brand-orange" />
            Authorized Brands
            <span className="w-8 h-px bg-brand-orange" />
          </p>
          <h2 className="heading-lg text-white mb-4">
            Representing <span className="text-gradient-orange">Premium Brands</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We are authorized distributors for India&apos;s most trusted piping, plumbing,
            valve, and waterproofing brands — ensuring you always get genuine, certified products.
          </p>
        </motion.div>

        {/* Marquee row 1 */}
        <div className="marquee-container mb-4">
          <div className="marquee-track gap-4">
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <BrandCard key={`r1-${i}`} brand={brand} />
            ))}
          </div>
        </div>

        {/* Marquee row 2 (reverse) */}
        <div className="marquee-container">
          <div
            className="marquee-track gap-4"
            style={{ animationDirection: "reverse", animationDuration: "25s" }}
          >
            {[...BRANDS.slice(8), ...BRANDS, ...BRANDS.slice(0, 8)].map((brand, i) => (
              <BrandCard key={`r2-${i}`} brand={brand} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 text-sm mb-4">
            Authorized distributor certificates available for all brands
          </p>
          <Link href="/brands" className="btn-secondary">
            View All Brands
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function BrandCard({ brand }: { brand: { id: number; name: string; color: string; description: string } }) {
  return (
    <div className="flex-shrink-0 w-40 h-20 bg-dark-100 border border-white/10 rounded-xl flex flex-col items-center justify-center gap-1 hover:border-brand-orange/30 hover:bg-dark-200 transition-all duration-300 cursor-default group px-4">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mb-1"
        style={{ backgroundColor: brand.color + "33", border: `1px solid ${brand.color}44` }}
      >
        <span style={{ color: brand.color }}>{brand.name[0]}</span>
      </div>
      <p className="text-white text-xs font-semibold text-center group-hover:text-brand-orange transition-colors">
        {brand.name}
      </p>
    </div>
  );
}
