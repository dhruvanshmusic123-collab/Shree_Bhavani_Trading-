"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/constants";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProductCategoriesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section className="section-padding bg-dark-100">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="section-tag">
              <span className="w-8 h-px bg-brand-orange" />
              Product Range
            </p>
            <h2 className="heading-lg text-white">
              Complete <span className="text-gradient-orange">Product Catalog</span>
            </h2>
          </div>
          <Link href="/products" className="btn-secondary whitespace-nowrap">
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {PRODUCT_CATEGORIES.map((cat) => (
            <motion.div key={cat.slug} variants={itemVariants}>
              <Link
                href={`/products?category=${cat.slug}`}
                className="block card-industrial p-5 product-card-hover group"
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="text-white text-sm font-semibold leading-snug mb-1.5 group-hover:text-brand-orange transition-colors">
                  {cat.name}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
                  {cat.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">{cat.count} items</span>
                  <ArrowRight
                    size={14}
                    className="text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transition-transform duration-200"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-10 p-6 bg-gradient-to-r from-brand-orange/10 via-transparent to-brand-blue/10 border border-white/5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold">Can&apos;t find what you&apos;re looking for?</p>
            <p className="text-gray-400 text-sm">
              We stock 500+ products. Send us your requirement list and we&apos;ll help you source it.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/quote" className="btn-primary">
              Get Quote
            </Link>
            <Link href="/contact" className="btn-ghost">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
