import dynamic from "next/dynamic";
import Script from "next/script";
import type { Metadata, Viewport } from "next";
import "@/styles/main.scss";

import Header from "@/components/sections/Header";
import { siteConfig } from "@/config/site";

const Footer = dynamic(() => import("@/components/sections/Footer"));
const GTM_ID = "GTM-537VNSFP";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.siteName,
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  authors: [{ name: "Pablo Daniel Chavez" }],
  creator: "Pablo Daniel Chavez",
  publisher: siteConfig.siteName,
  category: "Diseño web y desarrollo web",
  keywords: [
    "paginas web",
    "páginas web profesionales",
    "diseño de paginas web",
    "diseño de páginas web",
    "creacion de paginas web",
    "creación de páginas web",
    "desarrollo web",
    "sitios web profesionales",
    "paginas web para empresas",
    "páginas web para empresas",
    "paginas web para negocios",
    "páginas web para negocios",
    "paginas web para emprendedores",
    "páginas web para emprendedores",
    "landing page profesional",
    "landing pages para negocios",
    "desarrollo web a medida",
    "seo",
    "seo técnico",
    "posicionamiento en google",
    "optimización web",
    "desarrollador web argentina",
    "diseño web argentina",
    "desarrollo web argentina",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "4yIUAbvNIcrI3UhHJW9vszJTkYpBcBoyjlRtCzn7mUc",
  },
  openGraph: {
    title: "Diseño y Desarrollo de Páginas Web Profesionales",
    description:
      "Landing pages, sitios web corporativos, SEO y desarrollo web a medida para empresas, negocios y emprendedores.",
    siteName: siteConfig.siteName,
    images: [
      {
        url: siteConfig.defaultOpenGraphImage,
        width: 1200,
        height: 630,
        alt: "PaginasWebChavez - Diseño y desarrollo de páginas web profesionales",
      },
    ],
    locale: siteConfig.locale,
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Diseño de Páginas Web Profesionales | PaginasWebChavez",
    description:
      "Creación de páginas web rápidas, modernas y optimizadas para Google, enfocadas en generar consultas y clientes.",
    images: [
      {
        url: siteConfig.defaultOpenGraphImage,
        alt: "PaginasWebChavez - Diseño web profesional",
      },
    ],
  },

  icons: {
    icon: siteConfig.icon,
    shortcut: siteConfig.icon,
    apple: siteConfig.icon,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08080c",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.siteUrl}/#website`,
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
      inLanguage: siteConfig.language,
      publisher: {
        "@id": `${siteConfig.siteUrl}/#organization`,
      },
    },
    {
      "@type": "Organization",
      "@id": `${siteConfig.siteUrl}/#organization`,
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
      logo: `${siteConfig.siteUrl}${siteConfig.defaultOpenGraphImage}`,
      founder: {
        "@type": "Person",
        name: "Pablo Daniel Chavez",
      },
      areaServed: [
        {
          "@type": "Country",
          name: "Argentina",
        },
        {
          "@type": "AdministrativeArea",
          name: "Buenos Aires",
        },
      ],
      knowsAbout: [
        "Diseño de páginas web",
        "Desarrollo web",
        "Landing pages",
        "SEO técnico",
        "Optimización web",
        "Sitios web para empresas",
        "Sitios web para negocios",
      ],
    },
    {
      "@type": "Service",
      "@id": `${siteConfig.siteUrl}/#web-design-service`,
      name: "Diseño y desarrollo de páginas web profesionales",
      serviceType: [
        "Diseño de páginas web",
        "Desarrollo web",
        "Landing pages",
        "SEO",
        "Desarrollo web a medida",
      ],
      provider: {
        "@id": `${siteConfig.siteUrl}/#organization`,
      },
      areaServed: [
        {
          "@type": "Country",
          name: "Argentina",
        },
        {
          "@type": "AdministrativeArea",
          name: "Buenos Aires",
        },
      ],
      audience: {
        "@type": "Audience",
        audienceType: "Empresas, negocios y emprendedores",
      },
      description:
        "Diseño y desarrollo de páginas web profesionales, landing pages y sitios web optimizados para Google, rendimiento y generación de clientes.",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={siteConfig.language}>
      <body className="app-body">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),
              dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>

        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <header>
          <Header />
        </header>
        <main className="app-main">{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
