"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Package, Users, Award, Star } from "lucide-react";

const STATS = [
  { icon: Award, num: 30, suffix: "+", label: "Years of Experience", sub: "Serving since 1994" },
  { icon: Package, num: 500, suffix: "+", label: "Products in Stock", sub: "Across all categories" },
  { icon: Star, num: 16, suffix: "+", label: "Authorized Brands", sub: "Premium manufacturers" },
  { icon: Users, num: 2000, suffix: "+", label: "Happy Clients", sub: "Across Gujarat" },
];

export default function StatsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="py-16 bg-gradient-to-r from-brand-orange via-orange-600 to-brand-orange-dark relative overflow-hidden"
    >
      {/* Pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px)",
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map(({ icon: Icon, num, suffix, label, sub }) => (
            <div key={label} className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Icon size={22} className="text-white" />
                </div>
              </div>
              <p className="font-display text-4xl lg:text-5xl font-bold text-white">
                {inView ? <CountUp end={num} duration={2.5} suffix={suffix} /> : "0"}
              </p>
              <p className="text-orange-100 font-semibold mt-2">{label}</p>
              <p className="text-orange-200/70 text-xs mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
