import { MetadataRoute } from "next";
import { CORE_SERVICES, EXTERIOR_DESIGNS } from "@/data/livitectData";
import { BIHAR_SEO_CITIES } from "@/data/citySeoData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://livitechdesign.in";

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/exterior-designs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic Service Pages (/services/[slug])
  const serviceRoutes: MetadataRoute.Sitemap = CORE_SERVICES.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Dynamic Exterior Designs Showcase (/exterior-designs/[slug])
  const exteriorDesignRoutes: MetadataRoute.Sitemap = EXTERIOR_DESIGNS.map(
    (post) => ({
      url: `${baseUrl}/exterior-designs/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  // Programmatic Bihar City SEO Pages (/locations/[city])
  const cityLocationRoutes: MetadataRoute.Sitemap = BIHAR_SEO_CITIES.map((c) => ({
    url: `${baseUrl}/locations/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...exteriorDesignRoutes,
    ...cityLocationRoutes,
  ];
}
