"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, Shield, Award, Truck } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { getWhatsAppLink, buildInquiryMessage } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const TRUST_BADGES = [
  { icon: Shield, text: "Authorized Distributor" },
  { icon: Award, text: "Since 1994" },
  { icon: Truck, text: "Pan-Gujarat Delivery" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-bg-animated grid-pattern">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orange orb */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-brand-orange/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-brand-blue/10 blur-3xl" />

        {/* Pipe decorations */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="relative w-24 h-64">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-brand-orange/40 to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-brand-orange/20 to-transparent" />
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-px bg-brand-orange/30"
                style={{ top: `${20 + i * 20}%` }}
              />
            ))}
          </div>
        </div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-brand-orange/30"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Tag */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="section-tag"
          >
            <span className="w-8 h-px bg-brand-orange" />
            Total Piping Solution — Ahmedabad
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="heading-xl text-white mb-6"
          >
            India&apos;s Trusted
            <br />
            <span className="text-gradient-orange">Piping &amp; Plumbing</span>
            <br />
            Distributor
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-gray-300 text-lg sm:text-xl max-w-2xl mb-8 leading-relaxed"
          >
            Authorized wholesale distributors of UPVC, CPVC, SWR pipes, industrial valves,
            waterproofing chemicals &amp; sanitary systems. Serving contractors, builders &amp;
            engineers across Gujarat since{" "}
            <span className="text-brand-orange font-semibold">{COMPANY.established}</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link href="/products" className="btn-primary text-base px-8 py-4">
              View Products
              <ArrowRight size={18} />
            </Link>
            <Link href="/quote" className="btn-secondary text-base px-8 py-4">
              Request Quote
            </Link>
            <a
              href={getWhatsAppLink(buildInquiryMessage(), COMPANY.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-base px-8 py-4"
            >
              <Phone size={18} />
              WhatsApp Us
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            custom={0.4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            {TRUST_BADGES.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2"
              >
                <Icon size={14} className="text-brand-orange" />
                <span className="text-sm text-gray-300 font-medium">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10"
        >
          {[
            { num: "30+", label: "Years Experience", sub: "Est. 1994" },
            { num: "500+", label: "Products", sub: "In stock" },
            { num: "16+", label: "Brands", sub: "Authorized" },
            { num: "2000+", label: "Clients", sub: "Across Gujarat" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-dark/60 backdrop-blur-sm px-6 py-6 text-center"
            >
              <p className="font-display text-3xl font-bold text-brand-orange">{stat.num}</p>
              <p className="text-white text-sm font-medium mt-1">{stat.label}</p>
              <p className="text-gray-500 text-xs mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark to-transparent" />
    </section>
  );
}
