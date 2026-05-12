import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import StatsSection from "@/components/home/StatsSection";
import ProductCategoriesSection from "@/components/home/ProductCategoriesSection";
import BrandsSection from "@/components/home/BrandsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Shree Bhavani Trading Corporation | Total Piping Solution – Ahmedabad",
  description:
    "Shree Bhavani Trading Corporation – Authorized wholesale distributors of UPVC, CPVC, SWR pipes, ball valves, butterfly valves, waterproofing chemicals & sanitary systems in Ahmedabad, Gujarat since 1994.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <ProductCategoriesSection />
      <BrandsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
