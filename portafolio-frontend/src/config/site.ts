import type { Metadata } from "next";

const mainRoutes = {
  home: "/",
  profile: "/perfil",
  contact: "/contacto",
  services: "/servicios",
  projects: "/trabajos",
} as const;

const planRoutes = [
  "/servicios/planes/landing_page",
  "/servicios/planes/sitio_web",
  "/servicios/planes/desarrollo_web",
] as const;

export const siteConfig = {
  siteUrl: "https://paginaswebchavez.netlify.app",
  siteName: "PaginasWebChavez",
  defaultTitle:
    "Diseño y Desarrollo de Páginas Web Profesionales | PaginasWebChavez",

  description:
    "Páginas web para negocios, profesional, emprendimientos y pequeños equipos que necesitan presentar mejor lo que ofrecen o resolver una necesidad concreta de su actividad.",
  locale: "es_AR",
  language: "es-AR",
  defaultOpenGraphImage:
    "/img/Logotipo_Portafolio_PDC/Logo/logo_pwc.svg",
  icon: "/img/Logotipo_Portafolio_PDC/Logo/logo_pwc.ico",
  routes: mainRoutes,
  planRoutes,
} as const;

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
};

export const getAbsoluteUrl = (path: string) =>
  new URL(path, `${siteConfig.siteUrl}/`).toString();

export const createPageMetadata = ({
  title,
  description,
  path,
  type = "website",
  image = siteConfig.defaultOpenGraphImage,
}: PageMetadataOptions): Metadata => {
  const canonicalUrl = getAbsoluteUrl(path);
  const imageUrl = getAbsoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.siteName,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
};
