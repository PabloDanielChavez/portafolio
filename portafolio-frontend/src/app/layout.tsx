import dynamic from 'next/dynamic';
import Script from 'next/script';
import type { Metadata } from "next";
import "@/styles/main.scss";
import GTMTracker from "@/components/sub_components/GTMTracker";

import Header from "@/components/sections/Header";
const Footer = dynamic(() => import('@/components/sections/Footer'));

export const metadata: Metadata = {
  metadataBase: new URL('https://paginaswebchavez.netlify.app'),
  title: {
    default: "Diseño y Desarrollo de Páginas Web Profesionales | PaginasWebChavez",
    template: "%s | PaginasWebChavez"
  },
  description:"Diseño y desarrollo de páginas web profesionales para empresas, negocios y emprendedores. Landing Pages, sitios web corporativos, SEO y desarrollo web a medida optimizados para generar clientes.",
  
  authors: [{ name: "Pablo Daniel Chavez" }],
  keywords: [
  "paginas web",
  "diseño de paginas web",
  "creacion de paginas web",
  "desarrollo web",
  "sitios web profesionales",
  "paginas web para empresas",
  "paginas web para negocios",
  "paginas web para emprendedores",
  "landing page profesional",
  "desarrollo web a medida",
  "seo",
  "posicionamiento en google",
  "optimizacion web",
  "desarrollador web argentina",
  "diseño web argentina"
],
  robots: {
    index: true,
    follow: true,
  },
  
  verification: {
    google: '4yIUAbvNIcrI3UhHJW9vszJTkYpBcBoyjlRtCzn7mUc',

  },
  
  openGraph: {
    title:"Diseño y Desarrollo de Páginas Web Profesionales",
    description:"Landing Pages, sitios web corporativos y desarrollo web a medida para empresas, negocios y emprendedores.",
    url: "https://paginaswebchavez.netlify.app",
    siteName: "PaginasWebChavez", // Coherencia con el nuevo nombre
    images: [
      {
        url: "/img/Logotipo_Portafolio_PDC/Logo/logo_PW.png",
        width: 250,
        height: 250,
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title:"Portafolio PDC | Pablo Daniel Chavez",
    description:"Creación de páginas web optimizadas para Google y enfocadas en conseguir clientes.",
    images: ["/img/Logotipo_Portafolio_PDC/Logo/logo_PW.png"],
  },
  
  icons: {
    icon: "/img/Logotipo_Portafolio_PDC/Icono/Icono_48x48px.png",
    shortcut: "/img/Logotipo_Portafolio_PDC/Icono/Icono_48x48px.png",
  }
};

export const viewport = {
  themeColor: '#0d0d0d',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "PaginasWebChavez",
    "url": "https://paginaswebchavez.netlify.app",
    "description": "Diseño y desarrollo de páginas web profesionales para empresas y emprendedores.",
    "serviceType": [
      "Diseño de Páginas Web",
      "Desarrollo Web",
      "Landing Pages",
      "SEO",
      "Desarrollo Web a Medida"
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Buenos Aires"
      }
    ]
  }
  return (
    <html lang="es">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-537VNSFP');` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body style={{ overflowX: "hidden" }}>
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-537VNSFP"
            height="0" 
            width="0" 
            style={{display:"none", visibility:"hidden"}}>
          </iframe>
        </noscript>
        <header>
          <Header />
        </header>
        <main style={{ minHeight: "100vh" }}>
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
        {/* <GTMTracker /> */}
      </body>
    </html>
  );
}