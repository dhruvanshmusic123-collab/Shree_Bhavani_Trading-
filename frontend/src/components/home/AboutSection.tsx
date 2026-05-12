"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

const FEATURES = [
  "Authorized distributor for 16+ premium brands",
  "Complete piping solutions for residential & commercial",
  "Expert technical guidance for all projects",
  "Bulk wholesale pricing with flexible MOQ",
  "Quality certification for every product supplied",
  "Swift delivery across Ahmedabad & Gujarat",
];

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="section-padding bg-dark-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/3 rounded-full blur-3xl" />

      <div className="container-custom" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left – visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main card */}
            <div className="relative bg-dark border border-white/10 rounded-2xl p-8 overflow-hidden">
              {/* Pipe art */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-orange via-brand-orange/50 to-transparent" />
              <div className="absolute top-0 left-8 w-px h-full bg-gradient-to-b from-brand-orange/30 to-transparent" />

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { year: "1994", label: "Founded" },
                  { num: "500+", label: "Products" },
                  { num: "16+", label: "Brands" },
                  { num: "2000+", label: "Clients" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-dark-100 rounded-xl p-4 border border-white/5"
                  >
                    <p className="font-display text-2xl font-bold text-brand-orange">
                      {item.year || item.num}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="border-l-2 border-brand-orange pl-4">
                <p className="text-gray-300 text-sm italic leading-relaxed">
                  &quot;We have been the trusted partner for contractors, builders and infrastructure
                  companies in Gujarat for over three decades — delivering quality piping solutions
                  on time, every time.&quot;
                </p>
                <footer className="mt-3 text-brand-orange text-xs font-semibold">
                  — Shree Bhavani Trading Corporation
                </footer>
              </blockquote>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-brand-orange rounded-2xl p-5 shadow-orange-glow">
              <p className="font-display text-3xl font-bold text-white">30+</p>
              <p className="text-orange-100 text-xs font-medium">Years of</p>
              <p className="text-white text-sm font-semibold">Excellence</p>
            </div>
          </motion.div>

          {/* Right – text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-tag">
              <span className="w-8 h-px bg-brand-orange" />
              About Us
            </p>
            <h2 className="heading-lg text-white mb-6">
              Ahmedabad&apos;s Premier
              <br />
              <span className="text-gradient-orange">Piping Solutions</span> Partner
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Shree Bhavani Trading Corporation has been at the forefront of piping and plumbing
              material distribution in Ahmedabad since 1994. With over 30 years of industry
              expertise, we serve as authorized distributors for 16+ premium brands.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              From UPVC and CPVC pressure pipes to fire sprinkler systems, industrial valves,
              waterproofing chemicals, and sanitary products — we provide complete infrastructure
              material solutions for residential, commercial, and industrial projects.
            </p>

            {/* Feature list */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-brand-orange mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="btn-primary">
                Read Our Story
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-ghost">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
