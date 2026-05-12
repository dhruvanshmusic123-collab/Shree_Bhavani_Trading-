import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { COMPANY, NAV_LINKS, PRODUCT_CATEGORIES } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark-100 border-t border-white/5">
      {/* Main footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex flex-col leading-tight mb-4">
              <span className="font-display text-xl font-bold text-white">SHREE BHAVANI</span>
              <span className="text-xs font-semibold text-brand-orange tracking-[0.2em] uppercase">
                Trading Corporation
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Authorized distributors of premium piping, plumbing, drainage, valves, and
              waterproofing systems in Ahmedabad since 1994.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-orange/10 border border-brand-orange/20 rounded-full flex items-center justify-center">
                <span className="text-brand-orange text-xs font-bold">30</span>
              </div>
              <div>
                <p className="text-white text-xs font-semibold">Years of Trust</p>
                <p className="text-gray-500 text-[11px]">Est. 1994</p>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-brand-orange text-sm transition-colors group"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/quote"
                  className="flex items-center gap-2 text-gray-400 hover:text-brand-orange text-sm transition-colors group"
                >
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Get Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Product categories */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Products
            </h3>
            <ul className="space-y-2.5">
              {PRODUCT_CATEGORIES.slice(0, 8).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="flex items-center gap-2 text-gray-400 hover:text-brand-orange text-sm transition-colors group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="text-brand-orange mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-sm leading-relaxed">{COMPANY.address.full}</p>
              </li>
              <li>
                {COMPANY.phone.display.map((num) => (
                  <a
                    key={num}
                    href={`tel:${num.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-gray-400 hover:text-brand-orange text-sm mb-1.5 transition-colors"
                  >
                    <Phone size={14} className="text-brand-orange flex-shrink-0" />
                    {num}
                  </a>
                ))}
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email.primary}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-brand-orange text-sm transition-colors"
                >
                  <Mail size={14} className="text-brand-orange flex-shrink-0" />
                  {COMPANY.email.display}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={14} className="text-brand-orange flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm">{COMPANY.businessHours.weekdays}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{COMPANY.businessHours.sunday}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © {year} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
              Terms of Use
            </Link>
            <Link href="/sitemap.xml" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
