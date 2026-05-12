import type { MetadataRoute } from "next";
import { PRODUCT_CATEGORIES } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://shreebhavanitrading.com";

  const staticPages = [
    { url: base, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${base}/about`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/products`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${base}/brands`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/quote`, changeFrequency: "monthly" as const, priority: 0.8 },
  ];

  const categoryPages = PRODUCT_CATEGORIES.map((cat) => ({
    url: `${base}/products?category=${cat.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages];
}
