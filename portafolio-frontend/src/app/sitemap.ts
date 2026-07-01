import type { MetadataRoute } from "next";

import { esSlugTrabajoValido } from "@/components/utils/trabajos.helpers";
import { siteConfig } from "@/config/site";
import { getTrabajos } from "@/services/fetchData";
import type { TrabajosType } from "@/types/trabajos";

export const revalidate = 3600;

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

const toSitemapEntries = (
  entries: ReadonlyArray<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }>
): MetadataRoute.Sitemap =>
  entries.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, `${siteConfig.siteUrl}/`).toString(),
    changeFrequency,
    priority,
  }));

export const buildSitemap = (
  trabajos: ReadonlyArray<Pick<TrabajosType, "slug">>
): MetadataRoute.Sitemap => {
  const seenSlugs = new Set<string>();
  const workEntries = [];

  for (const trabajo of trabajos) {
    if (
      !esSlugTrabajoValido(trabajo?.slug) ||
      seenSlugs.has(trabajo.slug)
    ) {
      continue;
    }

    seenSlugs.add(trabajo.slug);
    workEntries.push({
      path: `${siteConfig.routes.projects}/${trabajo.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  }

  return toSitemapEntries([...sitemapEntries, ...workEntries]);
}

export const createSitemap = async (
  fetchTrabajos: () => Promise<TrabajosType[]> = getTrabajos
): Promise<MetadataRoute.Sitemap> => {
  try {
    return buildSitemap(await fetchTrabajos());
  } catch {
    console.error(
      "No se pudieron incluir los proyectos dinámicos en el sitemap."
    );

    return buildSitemap([]);
  }
};

export default function sitemap(): Promise<MetadataRoute.Sitemap> {
  return createSitemap();
}
