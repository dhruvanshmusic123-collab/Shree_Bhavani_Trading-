"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Package } from "lucide-react";
import { COMPANY, NAV_LINKS, PRODUCT_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-dark/95 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-transparent"
      )}
    >
      {/* Top bar */}
      <div className="hidden lg:block bg-dark-100 border-b border-white/5">
        <div className="container-custom flex items-center justify-between py-1.5">
          <p className="text-gray-400 text-xs">
            Authorized Distributors of Premium Piping & Plumbing Systems Since 1994
          </p>
          <div className="flex items-center gap-6">
            {COMPANY.phone.display.slice(0, 2).map((num) => (
              <a
                key={num}
                href={`tel:${num.replace(/\s/g, "")}`}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-brand-orange transition-colors"
              >
                <Phone size={11} />
                {num}
              </a>
            ))}
            <a
              href={`mailto:${COMPANY.email.primary}`}
              className="text-xs text-gray-400 hover:text-brand-orange transition-colors"
            >
              {COMPANY.email.display}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight group">
            <span className="font-display text-lg font-bold text-white group-hover:text-brand-orange transition-colors">
              SHREE BHAVANI
            </span>
            <span className="text-[10px] font-semibold text-brand-orange tracking-[0.2em] uppercase">
              Trading Corporation
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.label === "Products" ? (
                <div key="products" className="relative" ref={dropdownRef}>
                  <button
                    className={cn(
                      "nav-link flex items-center gap-1",
                      isActive("/products") && "text-white after:w-full"
                    )}
                    onClick={() => setIsProductsOpen((p) => !p)}
                    onMouseEnter={() => setIsProductsOpen(true)}
                  >
                    Products
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        isProductsOpen && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {isProductsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[720px] bg-dark-100 border border-white/10 rounded-2xl shadow-2xl p-6"
                        onMouseLeave={() => setIsProductsOpen(false)}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-semibold text-white">Product Categories</h3>
                          <Link
                            href="/products"
                            className="text-xs text-brand-orange hover:underline"
                          >
                            View all products →
                          </Link>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {PRODUCT_CATEGORIES.slice(0, 12).map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/products?category=${cat.slug}`}
                              className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                            >
                              <span className="text-lg">{cat.icon}</span>
                              <div>
                                <p className="text-xs font-medium text-gray-200 group-hover:text-white transition-colors">
                                  {cat.name}
                                </p>
                                <p className="text-[10px] text-gray-500">{cat.count} products</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3">
                          <Package size={14} className="text-brand-orange" />
                          <span className="text-xs text-gray-400">
                            500+ products across 21 categories — all from authorized brands
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "nav-link",
                    isActive(link.href) && "text-white after:w-full"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/quote" className="btn-secondary text-sm py-2 px-4">
              Get Quote
            </Link>
            <Link href="/contact" className="btn-primary text-sm py-2 px-4">
              Contact Us
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMobileOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-dark-100 border-t border-white/10"
          >
            <div className="container-custom py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-brand-orange/10 text-brand-orange"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
                <Link href="/quote" className="btn-secondary text-sm justify-center">
                  Get Quote
                </Link>
                <Link href="/contact" className="btn-primary text-sm justify-center">
                  Contact Us
                </Link>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10">
                {COMPANY.phone.display.slice(0, 2).map((num) => (
                  <a
                    key={num}
                    href={`tel:${num.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 py-2 text-sm text-gray-400 hover:text-brand-orange"
                  >
                    <Phone size={13} />
                    {num}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
