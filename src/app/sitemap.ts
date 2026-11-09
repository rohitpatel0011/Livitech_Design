import { MetadataRoute } from "next";
import { CORE_SERVICES, EXTERIOR_DESIGNS } from "@/data/livitectData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://livitechdesign.in";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = CORE_SERVICES.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const exteriorDesignRoutes: MetadataRoute.Sitemap = EXTERIOR_DESIGNS.map(
    (post) => ({
      url: `${baseUrl}/exterior-designs/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  return [...staticRoutes, ...serviceRoutes, ...exteriorDesignRoutes];
}
