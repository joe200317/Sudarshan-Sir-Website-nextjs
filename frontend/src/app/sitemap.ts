import type { MetadataRoute } from "next";
import { programs } from "@/data/programs";

const SITE_URL = "https://sudarshanfoundation.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/programs`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/awards`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/gallery`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/testimonials`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const programRoutes: MetadataRoute.Sitemap = programs.map((program) => ({
    url: `${SITE_URL}/programs/${program.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...programRoutes];
}
