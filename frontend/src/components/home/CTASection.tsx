"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { getWhatsAppLink, buildInquiryMessage } from "@/lib/utils";

export default function CTASection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-20 bg-dark-100 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />

      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="section-tag justify-center mb-4">
            <span className="w-8 h-px bg-brand-orange" />
            Ready to Order?
          </p>
          <h2 className="heading-lg text-white mb-4">
            Get the Best Price on
            <br />
            <span className="text-gradient-orange">Piping Materials</span> Today
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Share your material list and receive a competitive wholesale quotation within hours.
            We serve contractors, builders, architects and plumbers across Gujarat.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link href="/quote" className="btn-primary text-base px-8 py-4 w-full sm:w-auto justify-center">
              Request Quotation
              <ArrowRight size={18} />
            </Link>
            <a
              href={getWhatsAppLink(buildInquiryMessage(), COMPANY.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20BC5A] text-white font-semibold px-8 py-4 rounded-lg transition-all text-base w-full sm:w-auto justify-center"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
            <a
              href={`tel:+91${COMPANY.phone.primary}`}
              className="btn-ghost text-base px-8 py-4 w-full sm:w-auto justify-center"
            >
              <Phone size={18} />
              Call Directly
            </a>
          </div>

          {/* Contact details strip */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            {COMPANY.phone.display.slice(0, 2).map((num) => (
              <a
                key={num}
                href={`tel:${num.replace(/\s/g, "")}`}
                className="hover:text-brand-orange transition-colors"
              >
                📞 {num}
              </a>
            ))}
            <a
              href={`mailto:${COMPANY.email.primary}`}
              className="hover:text-brand-orange transition-colors"
            >
              ✉️ {COMPANY.email.display}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
