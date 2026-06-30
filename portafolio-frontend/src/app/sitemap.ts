import { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

const sitemapEntries = [
  {
    path: siteConfig.routes.home,
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    path: siteConfig.routes.profile,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: siteConfig.routes.contact,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: siteConfig.routes.services,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: siteConfig.routes.projects,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  ...siteConfig.planRoutes.map((path) => ({
    path,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  })),
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, `${siteConfig.siteUrl}/`).toString(),
    changeFrequency,
    priority,
  }));
}
