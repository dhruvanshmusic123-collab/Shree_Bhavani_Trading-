"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, ArrowUp, X } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { getWhatsAppLink, buildInquiryMessage } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="w-10 h-10 bg-dark-200 hover:bg-dark-300 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all shadow-lg"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded quick actions */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="flex flex-col gap-2"
          >
            {/* Call button */}
            <a
              href={`tel:+91${COMPANY.phone.primary}`}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-lg transition-all"
              aria-label="Call us"
            >
              <Phone size={15} />
              <span>Call Now</span>
            </a>

            {/* WhatsApp quick message */}
            <a
              href={getWhatsAppLink(buildInquiryMessage(), COMPANY.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20BC5A] text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-lg transition-all"
              aria-label="WhatsApp us"
            >
              <MessageCircle size={15} />
              <span>WhatsApp</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        animate={{ rotate: isExpanded ? 45 : 0 }}
        onClick={() => setIsExpanded((p) => !p)}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300",
          isExpanded
            ? "bg-dark-200 border border-white/20"
            : "bg-[#25D366] hover:bg-[#20BC5A] shadow-green-900/40"
        )}
        aria-label="Contact options"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isExpanded ? (
          <X size={22} className="text-white" />
        ) : (
          <MessageCircle size={24} className="text-white" />
        )}
      </motion.button>

      {/* WhatsApp tooltip on hover (when collapsed) */}
      {!isExpanded && (
        <div className="absolute right-16 bottom-0 flex items-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-dark-100 border border-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap"
          >
            Chat on WhatsApp
            <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2 h-2 bg-dark-100 border-r border-t border-white/10 rotate-45" />
          </motion.div>
        </div>
      )}
    </div>
  );
}
